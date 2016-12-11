# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(name:"Bob", email:"bob@gmail.com", password:"abcabc", profile_pic: "/bob.jpg")
User.create(name:"Sam", email:"sam@gmail.com", password:"abcabc", profile_pic: "/sam.jpg")
User.create(name:"Tom", email:"tom@gmail.com", password:"abcabc", profile_pic: "/tom.jpg")
User.create(name:"Sandy", email:"sandy@gmail.com", password:"abcabc", profile_pic: "/sandy.jpg")
User.create(name:"Mary", email:"mary@gmail.com", password:"abcabc", profile_pic: "/mary.jpg")
User.create(name:"Charles", email:"charles@gmail.com", password:"abcabc", profile_pic: "/charles.jpg")
Message.create(user_id:1, receiver_id:2, content:"Hello, Would you be open to a 15 minutes phone call? Best Regards.")
Message.create(user_id:1, receiver_id:3, content:"Hello, I admire your companies tremendous growth. Are you planning to release your fiscal year reports soon?")
Message.create(user_id:3, receiver_id:1, content:"Good Morning, I hope all is well. I am an investor looking to purchase stocks. I viewed your companies growth and am quite impressed. When will your company launch public stocks for sale?")
Message.create(user_id:4, receiver_id:1, content:"Good Evening, my name is Sandy and I am a venture capitalist. I came across your company and am interested to speak about possible investment oppurtunites.")
Message.create(user_id:2, receiver_id:1, content:"Hello Bob, my name is Sam and I am the CEO of stuff inc. I would like to speak to you about potential colloboration with your company. I look forward to your reply.")
