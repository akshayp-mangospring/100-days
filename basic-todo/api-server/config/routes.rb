Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'todos#test'

  get '/test', to: 'todos#test'

  get '/todos', to: 'todos#index'
  post '/todos', to: 'todos#create'
  put '/todos', to: 'todos#edit'
  delete '/todos', to: 'todos#delete'
end
