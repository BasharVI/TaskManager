import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from '../tasks/schemas/tasks.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(title: string, userId: string): Promise<Task> {
    const task = new this.taskModel({ title, user: userId });
    return task.save();
  }

  async findAll(userId: string): Promise<Task[]> {
    return this.taskModel.find({ user: userId }).exec();
  }

  async delete(taskId: string, userId: string): Promise<any> {
    return this.taskModel.deleteOne({ _id: taskId, user: userId }).exec();
  }

  async toggleComplete(taskId: string, userId: string): Promise<Task> {
    const task = await this.taskModel
      .findOne({ _id: taskId, user: userId })
      .exec();
    task.completed = !task.completed;
    return task.save();
  }
}
