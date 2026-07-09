import { colors } from '@/theme/colors';

export default function getColor(method: string): string {
  switch (method) {
    case 'get': {
      return colors.methodGet;
    }
    case 'post': {
      return colors.methodPost;
    }
    case 'put': {
      return colors.methodPut;
    }
    case 'patch': {
      return colors.methodPatch;
    }
    case 'delete': {
      return colors.methodDelete;
    }
    default: {
      return colors.methodDefault;
    }
  }
}
