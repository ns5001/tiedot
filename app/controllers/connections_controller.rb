class ConnectionsController < ApplicationController

  def create
    @connection = Connection.create(user_id: current_user.id, receiver_id: params[:receiver])
    respond_to do |format|
      format.html { render :show}
      format.json { render json: @connection }
    end
  end

  def destroy
    connection = Connection.find_by(id: params[:id])
    connection.destroy
  end

  def getReceivedRequests
    respond_to do |format|
      format.html { render :show }
      format.json { render json: current_user.received_requests }
    end
  end

  def getSentRequests
    respond_to do |format|
      format.html { render :show }
      format.json { render json: current_user.sent_requests }
    end
  end


  def update
    @connection = Connection.find_by(id: params[:id])

    if params[:status] == "true"
      @connection.accept
      # making the connection mutual by building anothe Connection object w/ receiver and user reversed
      Connection.create(receiver: @connection.user, user: @connection.receiver, status: true)
    else
      @connection.decline
    end

    respond_to do |format|
      format.json { render json: @connection}
    end
  end

  def index
    @connections = Connection.all
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @connections}
    end
  end

end
