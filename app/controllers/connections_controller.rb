class ConnectionsController < ApplicationController

  def create
    new_connection = Connection.create(user_id: params[:user1].to_i, user2_id: params[:user2].to_i)
  end

  def destroy
    connection = Connection.find_by(id: params[:id])
    connection.destroy
  end

  def update
    @user1 = User.find_by(id: JSON.parse(params[:data])[0]["value"].to_i)
    @user2 = User.find_by(id: JSON.parse(params[:data])[1]["value"].to_i)
    @connection = Connection.find_by(id: JSON.parse(params[:data])[2]["value"].to_i)
    @status = JSON.parse(params[:data])[3]["value"]
    if (@status == "true")
      @connection.status = true
      @connection.save
    else
      Connection.all.delete(@connection)
      @connection = ''
    end
    respond_to do |format|
      format.json { render json: @connection.to_json}
    end
  end

  def index
    if (current_user.requests[0].empty? && current_user.requests[1].empty?)
      @connections = ['Delete']
    else
      @connections = current_user.requests
    end
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @connections}
    end
  end






end
