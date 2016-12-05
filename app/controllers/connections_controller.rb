class ConnectionsController < ApplicationController

  def create
    new_connection = Connection.new(user_id: params[:user1].to_i, user2_id: params[:user2].to_i)
    user1 = User.find_by(id: params[:user1].to_i)
    Message.create(user_id: params[:user1].to_i, receiver: params[:user2].to_i, content: "#{user1.name} wants to connect", message_type: "CR", connection_id: new_connection.id)
  end

  def destroy
    connection = Connection.find_by(id: params[:id])
    connection.destroy
  end

  def update
    connection = Connection.find_by(id: params[:id])
    connection.status = true
  end

end
