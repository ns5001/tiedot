class ContactSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :company
  has_many :users
end
