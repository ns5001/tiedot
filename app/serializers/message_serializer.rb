class MessageSerializer < ActiveModel::Serializer
  attributes :id, :master_message_id, :content, :user, :receiver
end
