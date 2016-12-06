class Emailer < ApplicationRecord
  attr_accessor :mail_to, :mail_from, :mail_subject, :mail_body
  def send
    Pony.mail({
      :to => self.mail_to,
      :from => 'tiedot123456@gmail.com',
      :subject =>  self.mail_from,
      :body => self.mail_body,
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
end
