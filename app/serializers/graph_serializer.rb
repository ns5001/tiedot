class GraphSerializer < ActiveModel::Serializer
  attributes :id, :labels, :label, :data, :data_label, :color, :title, :comments
  has_one :user
  # has_many :comments
  # has_many :comments, embed: :id, :user_id, :content, :created_at,
  #           serializer: CommentSerializer, include: true

  def include_comments?
      # would include because the association is hydrated
    object.association(:comments).loaded?
  end

  def include_user?
    object.association(:user).loaded?
  end

end
