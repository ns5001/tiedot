class Graph < ApplicationRecord
  has_one :user
  has_many :comments
end
