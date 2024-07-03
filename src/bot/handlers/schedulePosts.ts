import { Context, Middleware } from "grammy";

type Media = {
  [mediaGroupId: string]: MediaItem
}

type MediaItem = {
  files: string[];
  caption?: string;
}

const media: Media = {}

export const schedulePostsHandler: Middleware<Context> = (ctx: Context) => {
  if (!ctx.message || !ctx.message.photo) {
    return 
  }

  const mediaGroupId = ctx.message.media_group_id
  const fileId = ctx.message.photo[0].file_id

  // one image message
  if (!mediaGroupId) {
    return
  }

  const first = !media[mediaGroupId]
  if (first) {
    media[mediaGroupId] = {
      caption: ctx.message?.caption || "",
      files: [fileId]
    }
  } else {
    media[mediaGroupId].caption = media[mediaGroupId].caption || ctx.message.caption
    media[mediaGroupId].files.push(fileId)
  }

  if (first) {
    setTimeout(() => {
      console.log(media)
    }, 1000)
  }
}

