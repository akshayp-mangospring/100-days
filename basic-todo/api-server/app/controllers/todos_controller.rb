class TodosController < ApplicationController
  def index
    render json: { todos: ['Hello, World!', 'Sieg Heil!'] }
  end

  def test
    render json: { message: 'Hello, World!' }
  end
end
