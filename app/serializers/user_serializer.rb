class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :company, :position, :age, :gender, :profile_pic,
             :location, :favoriteColor
  has_many :graphs
  has_many :messages
  # has_many :graphs, embed: :id, :labels, :label, :data, :data_label, :color, :title,
  #          serializer: GraphSerializer, include: true

  def include_graphs?
      object.association(:graphs).loaded?
  end
end
