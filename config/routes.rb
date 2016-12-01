Rails.application.routes.draw do
  devise_for :users
  resources :contacts
  resources :comments
  resources :graphs
  resources :users do
    resources :graphs
  end
  root :to =>'welcome#home'

  post '/users/:user_id/graphs/upload' => 'graphs#upload', as: 'users_graphs_upload'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
