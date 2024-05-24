import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UseGuards,
  Request
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body('title') title: string, @Request() req) {
    return this.tasksService.create(title, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req:any) {
    return this.tasksService.findAll(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':taskId')
  async delete(
    @Param('taskId') taskId: string,
  
  ) {
    return this.tasksService.delete(taskId);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('toggle/:taskId')
  async toggleComplete(
    @Param('taskId') taskId: string
  ) {
    return this.tasksService.toggleComplete(taskId);
  }
}
