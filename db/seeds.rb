# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Message.create(user_id:1, receiver_id:2, content:"Hello, Would you be open to a 15 minutes phone call? Best Regards.")
Message.create(user_id:1, receiver_id:3, content:"Hello, I admire your companies tremendous growth. Are you planning to release your fiscal year reports soon?")
Message.create(user_id:3, receiver_id:4, content:"Good Morning, I hope all is well. I am an investor looking to purchase stocks. I viewed your companies growth and am quite impressed. When will your company launch public stocks for sale?")
