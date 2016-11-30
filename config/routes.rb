Rails.application.routes.draw do
  devise_for :users
  resources :contacts
  resources :comments
  resources :graphs
  root :to =>'welcome#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
