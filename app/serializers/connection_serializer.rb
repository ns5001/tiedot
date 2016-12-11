class ConnectionSerializer < ActiveModel::Serializer
  attributes :id, :user, :receiver, :status
end
