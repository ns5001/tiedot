class ConnectionsController < ApplicationController

  def create
    binding.pry
    new_connection = Connection.new(user_id: params[:user1].id, user2_id: params[:user2].id)
    Message.create(user_id: params[:user1].id, receiver: params[:user2].id, content: "#{params[:user1].name} wants to connect", type: "CR", connection_id: new_connection.id)
    binding.pry
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
