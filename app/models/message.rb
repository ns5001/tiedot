class Message < ApplicationRecord
  belongs_to :user
  belongs_to :receiver, class_name: 'User'

  def self.getMessageChain(id)
    ary = Message.all.where(master_message_id: id)
  end

end
