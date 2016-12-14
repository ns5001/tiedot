Rails.application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => "omniauth_callbacks" }

  get "/messages/received" => 'messages#getReceivedMessages'
  get "/messages/sent" => 'messages#getSentMessages'
  get "/connections/received" => 'connections#getReceivedRequests'
  get "/connections/sent" => 'connections#getSentRequests'

  resources :messages
  resources :connections

  root :to =>'welcome#index'

  get "/users/sign_out.:id" => 'users#custom_sign_out'

  get 'messages/:id/message_data', to: 'messages#message_data'

  get 'users/:id/inbox', to: 'users#inbox'


  resources :users do
    resources :graphs
  end

  post '/users/:user_id/graphs/upload' => 'graphs#upload', as: 'users_graphs_upload'
  post "/users/:user_id/graphs/:id/send_mail" => "graphs#send_mail", as: 'user_graphs_email'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

end
