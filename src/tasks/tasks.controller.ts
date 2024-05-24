import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body('title') title: string, @Body('userId') userId: string) {
    return this.tasksService.create(title, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async findAll(@Param('userId') userId: string) {
    return this.tasksService.findAll(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':taskId')
  async delete(
    @Param('taskId') taskId: string,
  
  ) {
    return this.tasksService.delete(taskId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('toggle/:taskId')
  async toggleComplete(
    @Param('taskId') taskId: string,
    @Body('userId') userId: string,
  ) {
    return this.tasksService.toggleComplete(taskId, userId);
  }
}
