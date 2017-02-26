Rails.application.routes.draw do

  devise_for :users, :controllers => { :registrations => "registrations" }

  resources :contacts
  resources :comments
  resources :graphs

  get "/messages/received" => 'messages#getReceivedMessages'
  get "/messages/sent" => 'messages#getSentMessages'
  get "/connections/received" => 'connections#getReceivedRequests'
  get "/connections/sent" => 'connections#getSentRequests'

  resources :messages
  resources :connections

  root :to =>'welcome#index'
  get "/users/sign_out.:id" => 'users#custom_sign_out'
  get "/users/:id/inbox/" => 'users#inbox'
  get 'messages/:id/message_data', to: 'messages#message_data'
  get "/users/current_user" => 'users#getCurrentUser'
  get "/messages/chain/:id" => 'messages#messageHistory'

  resources :users do
    resources :graphs
  end

  post '/users/:user_id/graphs/upload' => 'graphs#upload', as: 'users_graphs_upload'
  post "/users/:user_id/graphs/:id/send_mail" => "graphs#send_mail", as: 'user_graphs_email'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

end
