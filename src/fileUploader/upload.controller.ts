import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  HttpCode,
  Req,
  HttpException,
  HttpStatus,
  Get,
  Query,
  Delete,
} from "@nestjs/common";
import { UploadService } from "./upload.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { MODULE } from "../global/system.enums";

@ApiTags("Upload file")
@Controller("uploadFiles")
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post("uploadS3")
  @HttpCode(200)
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "Files to upload",
    type: "multipart/form-data", // Type of the body
    required: true,
    schema: {
      type: "object",
      properties: {
        files: {
          type: "array",
          items: {
            type: "string",
            format: "binary", // Required for file uploads
          },
        },
      },
    },
  })
  @UseInterceptors(
    FilesInterceptor("files", 5, { limits: { fileSize: 450 * 1024 * 1024 } })
  )
  async uploadS3(@UploadedFiles() files: Express.Multer.File[], @Req() req) {
    try {
      const uploadPromises = files.map(
        (file) =>
          this.uploadService
            .uploadToWasabi(file)
            .then((res) => ({ success: true, data: res })) //shows success for every uploads
            .catch((error) => ({ success: false, error: error })) //shows error for every uploads when error occured
      );
      const results = await Promise.all(uploadPromises);
      return { files: results };
    } catch (error) {
      console.error("Upload failed:", error);
      throw new HttpException(
        "File upload failed",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("getImage")
  async getImageFromS3(@Query("filePath") filePath: string): Promise<any> {
    try {
      if (!filePath) {
        return { success: false, message: "File path is required" };
      }
      const signUrl = await this.uploadService.getSignedUrl(filePath);
      if (!signUrl) {
        return {
          success: false,
          message: "file download failed",
        };
      }
      return {
        success: true,
        message: "file downloaded successfully",
        url: signUrl,
      };
    } catch (error) {
      throw new HttpException(
        "Error while downloding file",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete("delete")
  async deleteFile(
    @Query("file") file: string,
    @Query("moduleName") moduleName: MODULE,
    @Query("id") id: number
  ) {
    try {
      const deleteFile = await this.uploadService.deleteFile(
        file,
        moduleName,
        id
      );
      return {
        success: deleteFile.success,
        message: deleteFile.message,
      };
    } catch (error) {
      throw new HttpException(
        "Failed to delete file",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
