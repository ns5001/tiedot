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
  has_many :requests, through: :connections, foreign_key: :user2_id
  has_many :messages
  has_many :received_messages, class_name: 'Message', foreign_key: :receiver_id

  def requests
    master_array = []
    received_arry = []
    sent_array = []
    sub_array = []

    Connection.where(user2_id:self.id, status:false).each do |connection|
      sub_array << @user1 = User.find_by(id: connection.user_id)
      sub_array << @user2 = User.find_by(id: connection.user2_id)
      sub_array << connection
      received_arry << sub_array
      sub_array = []
    end

    Connection.where(user_id:self.id, status:false).each do |connection|
      sub_array << @user1 = User.find_by(id: connection.user_id)
      sub_array << @user2 = User.find_by(id: connection.user2_id)
      sub_array << connection
      sent_array << sub_array
      sub_array = []
    end
    master_array << received_arry
    master_array << sent_array
    master_array
  end

  def messages
    master_array = []
    received_array = []
    sent_array = []
    sub_array = []

    Message.where(receiver_id:self.id, reply:false).each do |message|
      sub_array << @user1 = User.find_by(id: message.receiver_id)
      sub_array << @user2 = User.find_by(id: message.user_id)
      sub_array << message
      received_array << sub_array
      sub_array = []
    end

    Message.where(user_id:self.id, reply:false).each do |message|
      sub_array << @user1 = User.find_by(id: message.user_id)
      sub_array << @user2 = User.find_by(id: message.receiver_id)
      sub_array << message
      sent_array << sub_array
      sub_array = []
    end
    master_array << received_array
    master_array << sent_array
    master_array
  end

  def connections
    ary = []
    ary << Connection.where(user_id:self.id, status:true)
    ary << Connection.where(user2_id:self.id, status:true)
    ary
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
