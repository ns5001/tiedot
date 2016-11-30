Rails.application.routes.draw do
  devise_for :users, :controllers => { omniauth_callbacks: 'omniauth_callbacks' }
  resources :contacts
  resources :comments
  resources :graphs

  root :to =>'welcome#home'

end
