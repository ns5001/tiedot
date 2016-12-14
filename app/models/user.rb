class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
  :recoverable, :rememberable, :trackable, :validatable,
  :omniauthable, :omniauth_providers => [:linkedin]

  has_many :graphs
  has_many :comments
  has_many :user_contacts
  has_many :contacts, through: :user_contacts
  has_many :connections
  has_many :requests, class_name: 'Connection', foreign_key: :reciever_id
  has_many :messages
  has_many :received_messages, class_name: 'Message', foreign_key: :receiver_id

  def received_requests
    Connection.where(receiver_id:self.id, status:false)
  end

  def sent_requests
    Connection.where(user_id:self.id, status:false)
  end

  def sent_messages
    self.messages.where(reply: false)
  end

  def received_messages
    Message.where(receiver_id:self.id, reply:false)
  end


 def self.connect_to_linkedin(auth, signed_in_resource=nil)
  user = User.where(:provider => auth.provider, :uid => auth.uid).first
  if user
    return user
  else
    registered_user = User.where(:email => auth.info.email).first
  if registered_user
    return registered_user
  else
    user = User.create(name:auth.info.first_name, provider:auth.provider, uid:auth.uid, email:auth.info.email, password:Devise.friendly_token[0,20],
  )
  end
  end
end

end
