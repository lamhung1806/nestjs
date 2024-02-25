import { IsEnum } from 'class-validator';
import { OptionalProperty } from 'src/decorators/validator.decorator';
import { BasePagingDto, SortOrder } from 'src/utils/base.dto';

export class UserDto extends BasePagingDto {
  @OptionalProperty()
  startDate?: Date;

  @OptionalProperty()
  endDate?: Date;

  @OptionalProperty({
    type: 'string',
    required: false,
  })
  @OptionalProperty({
    type: 'string',
    description: 'asc or desc',
  })
  @IsEnum(SortOrder)
  sortOrder: SortOrder;
}
