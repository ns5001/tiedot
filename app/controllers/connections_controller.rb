class ConnectionController < ApplicationController

  def create
    new_connection = Connection.new(user1_id: params[:user1], user2_id: params[:user2])
    Message.new(user_id: params[:user1], receiver: params[:user2], content: "#{params[:user1].name} wants to connect", type: "CR", connection_id: new_connection.id)
    
  end

end
