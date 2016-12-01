class ContactsController < ApplicationController
  def new
  end

  def create

  end

  def show
    @contact = Contact.find(params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @contact}
    end
  end

  def update
  end

  def index
    @contacts = Contact.all
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @contacts}
    end
  end
  
end
