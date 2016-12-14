class Message < ApplicationRecord
  belongs_to :user
  belongs_to :receiver, class_name: 'User'

  def self.createReply(data)
    old_message = Message.find_by(id: data[:message_id])
    Message.create(content: data[:content], user_id: old_message.receiver_id, receiver_id: old_message.user_id)
    old_message.reply = true
    old_message.save
  end

end
