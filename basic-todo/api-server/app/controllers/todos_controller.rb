class TodosController < ApplicationController
  def index
    render json: { todos: Todo.all }
  end

  def create
    render json: { status: :ok, content: params[:content], id: Time.now }
  end

  def test
    render json: { message: 'Hello, World!' }
  end
end
