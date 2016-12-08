class Connection < ApplicationRecord
  belongs_to :user
  belongs_to :colleague, class_name: 'User', foreign_key: :user2_id
end
