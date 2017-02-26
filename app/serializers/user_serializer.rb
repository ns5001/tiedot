class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :last_name, :company, :position, :dob, :gender, :profile_pic,
             :location, :favoriteColor
  has_many :graphs

end
