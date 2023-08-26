Rails.application.routes.draw do

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'todos#test'

  get '/test', to: 'todos#test'

  # Auth Routes
  post '/login', to: 'authentication#login'
  post '/signup', to: 'authentication#signup'

  # Todos Routes
  get '/todos', to: 'todos#index'
  post '/todos', to: 'todos#create'
  put '/todos', to: 'todos#edit'
  delete '/todos', to: 'todos#delete'
  put '/todos/:id/done', to: 'todos#done'

  # Articles Routes
  get '/articles', to: 'articles#index'
  post '/articles', to: 'articles#create'
  get '/articles/:id', to: 'articles#show'
  put '/articles/:id', to: 'articles#edit'
  delete '/articles/:id', to: 'articles#delete'

  # Article Comments Routes
  post '/articles/:id/comment', to: 'articles#add_comment'
  delete '/articles/:id/comment', to: 'articles#delete_comment'
  put '/articles/:id/comment', to: 'articles#edit_comment'

  # Videos Routes
  get '/videos' , to: 'videos#index'
  post '/videos' , to: 'videos#create'
  get '/videos/:id' , to: 'videos#show'
  put '/videos/:id' , to: 'videos#edit'
  delete '/videos/:id' , to: 'videos#delete'

  # Video Comments Routes
  post '/videos/:id/comment', to: 'videos#add_comment'
  delete '/videos/:id/comment', to: 'videos#delete_comment'
  put '/videos/:id/comment', to: 'videos#edit_comment'
end
