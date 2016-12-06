class Emailer < ApplicationRecord
  attr_accessor :mail_to, :mail_from, :mail_subject, :mail_body, :sender
  def send
    Pony.mail({
      :to => self.mail_to,
      :from => 'tiedot123456@gmail.com',
      :subject =>  "New Graph sent to you through tiedot.com from #{self.sender.to_s}",
      :body => self.mail_body,
      :attachments => {"foo.png" => File.read("#{self.mail_to}Graph.gif")},
      :via => :smtp,
      :via_options => {
        :address              => 'smtp.gmail.com',
        :port                 => '587',
        :enable_starttls_auto => true,
        :user_name            => 'tiedot123456',
        :password             => 'TieDot123',
        :authentication       => :plain, # :plain, :login, :cram_md5, no auth by default
        :domain               => "localhost.localdomain" # the HELO domain provided by the client to the server
      }
    })
  end

  def open_file(sender,email,input)
    self.sender = sender
    self.mail_to = email
    edit_graph = input[22..input.length]
    File.open("#{self.mail_to.to_s}Graph.gif", 'wb') do |f|
      f.write(Base64.decode64(edit_graph))
    end
  end

  def send_email(message)
    self.mail_body = message
    self.send
  end

end
