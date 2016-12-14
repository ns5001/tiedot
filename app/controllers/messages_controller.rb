class MessagesController < ApplicationController
  def index
    respond_to do |format|
      format.html { render :show }
      format.json { render json: Message.all }
    end
  end

  def getReceivedMessages
    respond_to do |format|
      format.html { render :show }
      format.json { render json: current_user.received_messages }
    end
  end

  def getSentMessages
    respond_to do |format|
      format.html { render :show }
      format.json { render json: current_user.sent_messages }
    end
  end

  def create
    if params[:message_id]
      @message = Message.createReply(params)
    else
      @message = current_user.messages.build(message_params)
      @message.save
    end
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @message}
    end
  end

  def show
    @message = Message.find(params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @message}
    end
  end

  def destroy
    message = Message.find_by(id: params[:id])
    message.destroy
  end

  private

  def message_params
    params.require(:message).permit(:content, :receiver_id, :user_id)
  end

end










# What was work/life balance like?
# If you could come back to flatiron, what would you focus on more?
#
#how did you set goals for yourself, did they work?
#steph - Keep an open mind and apply everywhere.
#pony foo - subscribe to this blog

#get good in searching (for googling and debugging)


# red flags:
# not shipping a product in production
# missing paycheck
#
#chris what was work-life balance like and how did it change in your second job?

#bring up issues early on


#ios
#Data scientist
#mobile engineer
#front end developer - 2 years
