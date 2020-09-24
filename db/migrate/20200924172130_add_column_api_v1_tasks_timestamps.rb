class AddColumnApiV1TasksTimestamps < ActiveRecord::Migration[6.0]
  def change
    add_column :api_v1_tasks, :created_at, :datetime
    add_column :api_v1_tasks, :updated_at, :datetime
  end
end
