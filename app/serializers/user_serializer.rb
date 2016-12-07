class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :company, :position, :age, :gender, :profile_pic,
             :location, :favoriteColor
  has_many :graphs
end
