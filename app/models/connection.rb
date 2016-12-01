class Connection < ApplicationRecord
  belongs_to :user
  belongs_to :colleague, class_name: 'User', foreign_key: :user2_id
end

#
# Friendships
# belongs_to :user
# belongs_to :friend, class_name: 'User', foreign_key: friend_id
#
# user_id | friend_id | accepted
#
# has_many :friendships
# has_many :friends, through: :friendships, source: :friend
#
# user.friends
