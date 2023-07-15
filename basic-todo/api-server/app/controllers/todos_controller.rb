class TodosController < ApplicationController
  def index
    render json: { todos: Todo.all.reverse }
  end

  def create
    @todo = Todo.new(content: params[:content])

    if @todo.save
      render json: { status: :ok, message: 'Todo saved successfully', todo: @todo }
    else
      render json: { status: :unprocessable_entity, message: 'There was an error saving the Todo', todo: nil }
    end
  end

  def edit
    render json: { status: :ok, message: 'Todo Edited' }
  end

  def delete
    render json: { status: :ok, message: 'Todo Deleted' }
  end

  def test
    render json: { message: 'Hello, World!' }
  end
end
