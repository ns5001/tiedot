class GraphSerializer < ActiveModel::Serializer
  attributes :id, :labels, :label, :data, :data_label, :color, :title, :description, :comments
  has_one :user
end
