/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema
    .createTable('projects', function (table) {
      table.increments('project_id');
      table.string('project_name').notNullable();
      table.string('project_description');
      table.integer('project_completed').defaultTo(0);
    })
    .createTable('resources', function (table) {
      table.increments('resource_id');
      table.string('resource_name').notNullable().unique();
      table.string('resource_description');
    })
    .createTable('tasks', function (table) {
      table.increments('task_id');
      table.string('task_description').notNullable();
      table.string('task_notes');
      table.integer('task_completed').defaultTo(0);
      table.integer('project_id').unsigned().notNullable().references('project_id').inTable('projects').onDelete('CASCADE').onUpdate('CASCADE');
    })
    .createTable('project_resources', function (table) {
      table.increments('id');
      table.integer('project_id').unsigned().notNullable().references('project_id').inTable('projects').onDelete('CASCADE').onUpdate('CASCADE');
      table.integer('resource_id').unsigned().notNullable().references('resource_id').inTable('resources').onDelete('CASCADE').onUpdate('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('project_resources');
  await knex.schema.dropTableIfExists('tasks');
  await knex.schema.dropTableIfExists('resources');
  await knex.schema.dropTableIfExists('projects');
};
