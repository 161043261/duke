import base64


def webp2b64Str(inFilePath):
  with open(inFilePath, "rb") as webp:
    b64EncStr = base64.b64encode(webp.read())
  return b64EncStr.decode('utf-8')


def write2txt(b64EncStr, outFilePath):
  with open(outFilePath, "w") as txt:
    txt.write(b64EncStr)


if __name__ == '__main__':
  write2txt(webp2b64Str('./qiqi.webp'), './qiqi.txt')
