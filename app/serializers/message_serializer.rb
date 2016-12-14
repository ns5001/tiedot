class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :user, :receiver
end
