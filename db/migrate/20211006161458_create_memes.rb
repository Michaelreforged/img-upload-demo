class CreateMemes < ActiveRecord::Migration[6.1]
  def change
    create_table :memes do |t|
      t.string :image
      t.string :text

      t.timestamps
    end
  end
end
