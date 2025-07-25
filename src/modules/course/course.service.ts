import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import {
  AssistantAddCourse,
  CourseAllDto,
  CourseMentorAllDto,
  CreateCourseDto,
  UpdateCourseDto,
} from './dto/create-course.dto';
import { CourseLevel } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async CourseAll(payload: CourseAllDto) {
    let {
      offset = 1,
      limit = 10,
      search,
      level,
      category_id,
      mentor_id,
      price_min,
      price_max,
    } = payload;

    if (mentor_id) {
      let oldmentor = await this.prisma.users.findFirst({
        where: { id: mentor_id },
      });

      if (!oldmentor) throw new NotFoundException('Mentor not found');
    }

    if (category_id) {
      let oldmentor = await this.prisma.courseCategory.findFirst({
        where: { id: category_id },
      });

      if (!oldmentor) throw new NotFoundException('Category not found');
    }

    let filter: any = [];
    if (search) {
      filter.push({
        Cursecategory: {
          is: {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
      });
    }
    if (level) {
      filter.push({
        level: level,
      });
    }

    if (category_id) {
      filter.push({
        category_id: category_id,
      });
    }

    if (mentor_id) {
      filter.push({
        mentor_id: mentor_id,
      });
    }

    if (price_min && price_max) {
      filter.push({
        price: {
          gte: Number(price_min),
          lte: Number(price_max),
        },
      });
    } else if (price_min) {
      filter.push({
        price: {
          gte: Number(price_min),
        },
      });
    } else if (price_max) {
      filter.push({
        price: {
          lte: Number(price_max),
        },
      });
    }

    let wherefilter: any = { published: true };
    if (filter.length) {
      wherefilter.OR = filter;
    }

    let data = await this.prisma.course.findMany({
      where: wherefilter,
      include: {
        Cursecategory: true,
        mentor: true,
      },

      take: limit,
      skip: (offset - 1) * limit,
    });

    return { succase: true, message: 'Succase  course all', data };
  }

  async CourseOne(id: string) {
    let data = await this.prisma.course.findFirst({
      where: {
        id,
      },
    });
    if (!data) throw new NotFoundException('Course not found');
    return { succase: true, message: 'Succase course', data };
  }

  async CoursefullOne(id: string) {
    let data = await this.prisma.course.findFirst({
      where: {
        id,
      },
      include: {
        questions: true,
        assignedCourses: true,
        Cursecategory: true,
        lessonBolimlar: true,
        lastActivities: true,
        lessons: true,
        purchasedCourses: true,
        ratings: true,
        mentor: true,
      },
    });

    if (!data) throw new NotFoundException('Course not found');
    return { succase: true, message: 'Succase course', data };
  }

  async CoursefullAll(payload: CourseAllDto) {
    let {
      offset = 1,
      limit = 10,
      search,
      level,
      category_id,
      mentor_id,
      price_min,
      price_max,
    } = payload;

    if (mentor_id) {
      let oldmentor = await this.prisma.users.findFirst({
        where: { id: mentor_id },
      });

      if (!oldmentor) throw new NotFoundException('Mentor not found');
    }

    if (category_id) {
      let oldmentor = await this.prisma.courseCategory.findFirst({
        where: { id: category_id },
      });

      if (!oldmentor) throw new NotFoundException('Category not found');
    }

    let filter: any = [];

    if (search) {
      filter.push({
        Cursecategory: {
          name: search,
        },
      });
    }

    if (level) {
      filter.push({
        level: level,
      });
    }

    if (category_id) {
      filter.push({
        category_id: category_id,
      });
    }

    if (mentor_id) {
      filter.push({
        mentor_id: mentor_id,
      });
    }

    if (price_min && price_max) {
      filter.push({
        price: {
          gte: Number(price_min),
          lte: Number(price_max),
        },
      });
    } else if (price_min) {
      filter.push({
        price: {
          gte: Number(price_min),
        },
      });
    } else if (price_max) {
      filter.push({
        price: {
          lte: Number(price_max),
        },
      });
    }
    let wherefilter: any = {};
    if (filter.length) {
      wherefilter.OR = filter;
    }

    let data = await this.prisma.course.findMany({
      where: wherefilter,
      include: {
        questions: true,
        assignedCourses: true,
        Cursecategory: true,
        lessonBolimlar: true,
        lastActivities: true,
        lessons: true,
        purchasedCourses: true,
        ratings: true,
        mentor: true,
      },
      take: limit,
      skip: (offset - 1) * limit,
    });

    return {
      succase: true,
      message: 'Succase courses all',
      data,
    };
  }

  async myCourse(id: string) {
    let data = await this.prisma.course.findFirst({
      where: {
        mentorId: id,
      },
      include: {
        questions: true,
        assignedCourses: true,
        Cursecategory: true,
        lessonBolimlar: true,
        lastActivities: true,
        lessons: true,
        purchasedCourses: true,
        ratings: true,
        mentor: true,
      },
    });

    if (!data) throw new NotFoundException('Course not found');
    return {
      succase: true,
      message: 'Succase my course',
      data,
    };
  }

  async CoursesMentorAll(id: string, payload: CourseMentorAllDto) {
    let {
      offset = 1,
      limit = 10,
      search,
      level,
      category_id,
      price_min,
      price_max,
    } = payload;

    let filter: any = [];

    if (search) {
      filter.push({
        Cursecategory: {
          name: search,
          mode: 'insensitive',
        },
      });
    }

    if (level) {
      filter.push({
        level: {
          contains: level,
          mode: 'insensitive',
        },
      });
    }

    if (category_id) {
      filter.push({
        category_id: category_id,
      });
    }

    if (price_min && price_max) {
      filter.push({
        price: {
          gte: Number(price_min),
          lte: Number(price_max),
        },
      });
    } else if (price_min) {
      filter.push({
        price: {
          gte: Number(price_min),
        },
      });
    } else if (price_max) {
      filter.push({
        price: {
          lte: Number(price_max),
        },
      });
    }

    let wherefilter: any = { mentor_id: id };
    if (filter.length) {
      wherefilter.OR = filter;
    }

    let data = await this.prisma.course.findMany({
      where: wherefilter,
      include: {
        questions: true,
        assignedCourses: true,
        Cursecategory: true,
        lessonBolimlar: true,
        lastActivities: true,
        lessons: true,
        purchasedCourses: true,
        ratings: true,
        mentor: true,
      },
      take: limit,
      skip: (offset - 1) * limit,
    });

    return {
      succase: true,
      message: 'Succase mentor course',
      data,
    };
  }

  async courses_assiged(id: string, payload: CourseMentorAllDto) {
    let {
      offset = 1,
      limit = 10,
      search,
      level,
      category_id,
      price_min,
      price_max,
    } = payload;

    let filter: any = [];

    if (search) {
      filter.push({
        course: {
          Cursecategory: {
            name: search,
          },
        },
      });
    }

    if (level) {
      filter.push({
        level: {
          contains: level,
          mode: 'insensitive',
        },
      });
    }

    if (category_id) {
      filter.push({
        category_id: category_id,
      });
    }

    if (price_min && price_max) {
      filter.push({
        price: {
          gte: Number(price_min),
          lte: Number(price_max),
        },
      });
    } else if (price_min) {
      filter.push({
        price: {
          gte: Number(price_min),
        },
      });
    } else if (price_max) {
      filter.push({
        price: {
          lte: Number(price_max),
        },
      });
    }

    let wherefilter: any = { mentor_id: id };
    if (filter.length) {
      wherefilter.OR = filter;
    }

    let data = await this.prisma.assignedCourse.findMany({
      where: wherefilter,
      include: {
        user: true,
        course: true,
      },
      take: limit,
      skip: (offset - 1) * limit,
    });

    return {
      succase: true,
      message: 'Succase Assistant course',
      data,
    };
  }

  async foundAssistant(id: string) {
    let data = await this.prisma.course.findMany({
      where: {
        id,
      },
      include: {
        questions: true,
        ratings: true,
        purchasedCourses: true,
        assignedCourses: true,
        lastActivities: true,
        lessonBolimlar: true,
        lessons: true,
        Cursecategory: true,
        mentor: true,
      },
    });

    if (!data) throw new NotFoundException('Course not found');

    return {
      succase: true,
      message: 'Succase Assistant course',
      data,
    };
  }

  async add_Assistant(payload: AssistantAddCourse) {
    let { assistant_id, course_id } = payload;

    let olduser = await this.prisma.users.findFirst({
      where: {
        id: assistant_id,
      },
    });

    let oldcourse = await this.prisma.course.findFirst({
      where: {
        id: course_id,
      },
    });

    if (!olduser) throw new NotFoundException('Assistant not found');
    if (!oldcourse) throw new NotFoundException('Course not found');

    let data = await this.prisma.assignedCourse.create({
      data: {
        userId: assistant_id,
        courseId: course_id,
      },
      include: {
        user: true,
        course: true,
      },
    });

    return {
      status: true,
      message: 'Succase Assistant add Course',
      data,
    };
  }

  async createCourse(
    id: string,
    payload: CreateCourseDto,
    banner_url: string,
    intro_url: string,
  ) {
    let { name, about, price, level, categoryId } = payload;

    let oldcategory = await this.prisma.courseCategory.findUnique({
      where: { id: payload.categoryId },
    });
    if (!oldcategory) {
      throw new NotFoundException('Category not found');
    }

    let oldmentor = await this.prisma.users.findFirst({
      where: {
        id,
        OR: [{ role: 'ADMIN' }, { role: 'MENTOR' }],
      },
    });
    if (!oldmentor) throw new NotFoundException('Mentor not found');

    let data = await this.prisma.course.create({
      data: {
        name,
        introVideo: intro_url,
        about,
        price,
        level: CourseLevel[level],
        cursecategoryId: categoryId,
        banner: banner_url,
        mentorId: id,
      },

      include: {
        questions: true,
        ratings: true,
        purchasedCourses: true,
        assignedCourses: true,
        lastActivities: true,
        lessonBolimlar: true,
        lessons: true,
        Cursecategory: true,
        mentor: true,
      },
    });

    return {
      status: true,
      message: 'Succase created Course',
      data,
    };
  }

  async CoursePublish(id: string) {
    let oldcourse = await this.prisma.course.findFirst({
      where: {
        id,
      },
    });

    if (!oldcourse) throw new NotFoundException('Course Not found');

    let data = await this.prisma.course.update({
      where: { id },
      data: { published: true },
    });

    return {
      status: true,
      message: 'Succase published',
      data,
    };
  }

  async CourseunPublish(id: string) {
    let oldcourse = await this.prisma.course.findFirst({
      where: {
        id,
      },
    });

    if (!oldcourse) throw new NotFoundException('Course Not found');

    let data = await this.prisma.course.update({
      where: { id },
      data: { published: false },
    });

    return {
      status: true,
      message: 'Succase unpublished',
      data,
    };
  }

  async CourseUpdateMentor(id: string, mentor_id: string) {
    let oldcourse = await this.prisma.course.findFirst({
      where: {
        id,
      },
    });

    if (!oldcourse) throw new NotFoundException('Course Not found');

    let data = await this.prisma.course.update({
      where: { id },
      data: { mentorId: mentor_id },
    });

    return {
      status: true,
      message: 'Succase updated mentor',
      data,
    };
  }

  async Coursedelete(id: string) {
    let oldcourse = await this.prisma.course.findFirst({
      where: {
        id,
      },
    });

    if (!oldcourse) throw new NotFoundException('Course Not found');

    let data = await this.prisma.course.delete({
      where: { id },
    });

    return {
      status: true,
      message: 'Succase deleted',
      data: oldcourse,
    };
  }

  async updateMentorCourse(
    courseId: string,
    payload: UpdateCourseDto,
    banner_url: string,
    intro_url: string,
  ) {
    let course = await this.prisma.course.findFirst({
      where: { id: courseId },
    });

    let courseCategory = await this.prisma.courseCategory.findFirst({
      where: {
        id: payload.cursecategoryId,
      },
    });

    if (!courseCategory) throw new NotFoundException('Category not found ');
    if (!course) throw new NotFoundException('Course not found');

    let introVideo = course.introVideo;
    let banner = course.banner;

    if (intro_url) {
      introVideo = intro_url;

      let oldPathintro = path.join(
        process.cwd(),
        'uploads',
        'Introvideo',
        course.introVideo!,
      );
      if (fs.existsSync(oldPathintro)) {
        fs.unlinkSync(oldPathintro);
      }
    }

    if (banner) {
      banner = banner_url;

      let oldPath = path.join(
        process.cwd(),
        'uploads',
        'banner',
        course.banner!,
      );
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }

      let updated = await this.prisma.course.update({
        where: { id: courseId },
        data: {
          ...payload,
          introVideo,
          banner,
        },
      });

      return {
        message: 'Course updated successfully',

        data: updated,
      };
    }
  }
}
