class MessagesController < ApplicationController
  def index
    @messages = current_user.messages
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @messages.to_json}
    end
  end

  def create
    @old_message = Message.find_by(id: JSON.parse(params[:data])[3]["value"])
    @old_message.reply = true
    @old_message.save

    @user1 = current_user
    @user2 = User.find_by(id: JSON.parse(params[:data])[1]["value"])
    @master_message = Message.find_by(id: JSON.parse(params[:data])[2]["value"])
    content = JSON.parse(params[:data])[4]["value"]
    @message = Message.create(user_id: @user1.id, receiver_id: @user2.id, content: content)
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @message.to_json}
    end
  end

  def show
    @message = Message.find(params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @message}
    end
  end

  def messageHistory
    @chain = Message.getMessageChain(params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @chain.to_json}
    end
  end

  def destroy
    @message = Message.find_by(id: params[:id])
    @message.destroy
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @message}
    end
  end

  private

  def message_params
    params.require(:message).permit(:receiver, :content, :message_type, :accept, :master_message_id, :connection_id, :user_id)
  end

end
