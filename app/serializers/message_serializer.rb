class MessageSerializer < ActiveModel::Serializer
  attributes :id, :receiver, :content, :message_type, :accept, :master_message_id, :connection_id, :user_id
end
