using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Linq;
using System.Text;
using System.Web;

namespace StockNews.DDD.Utils {
    /// <summary>
    /// 验证码
    /// </summary>
    /// <remarks>
    /// 创 建 人 :  
    /// 创建时间 : 2017/1/22 9:46:29
    /// 修 改 人 :
    /// 修改时间 :
    /// 修改描述 :
    /// </remarks>
    public class VerificationUtils {
        /// <summary>
        /// 验证码的最大长度
        /// int
        /// </summary>
        public int MaxLenght {
            get { return 10; }
        }
        /// <summary>
        /// 验证码的最小长度
        /// int
        /// </summary>
        public int MinLenght {
            get { return 1; }
        }
        /// <summary>
        /// 获取随机数
        /// </summary>
        /// <param name="Len">长度</param>
        /// <param name="strType">
        /// 类型 1数字加字母(大小) 2数字 3字母(小) 4字母(大) 5字母(大小) 6数字加字母(大) 7数字加字母(小)
        /// </param>
        /// <returns>string</returns>
        public static string GetRandString(int Len, int strType = 1) {
            string strCode = "";

            #region 匹配
            switch (strType) {
                case 1:
                    strCode = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
                    break;
                case 2:
                    strCode = "0123456789";
                    break;
                case 3:
                    strCode = "abcdefghijklmnopqrstuvwxyz";
                    break;
                case 4:
                    strCode = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    break;
                case 5:
                    strCode = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
                    break;
                case 6:
                    strCode = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    break;
                case 7:
                    strCode = "0123456789abcdefghijklmnopqrstuvwxyz";
                    break;
            };
            #endregion

            string str = "";
            Random ran = new Random();
            for (int i = 0; i < Len; i++) {
                str += strCode.Substring(ran.Next(strCode.Length), 1);
            }
            return str;
        }
        /// <summary>
        /// 生成验证码
        /// </summary>
        /// <param name="str">随机数</param>
        public static void GenerateVerification(string str) {
            //设置不缓存此页
            HttpContext.Current.Response.AppendHeader("pragma", "no-cache");
            HttpContext.Current.Response.AppendHeader("Cache-Control", "no-cache, must-revalidate");
            HttpContext.Current.Response.AppendHeader("expires", "0");

            Random rand = new Random();

            //创建画板
            Bitmap image = new Bitmap(80, 26);
            Graphics g = Graphics.FromImage(image);
            //g.InterpolationMode = InterpolationMode.HighQualityBicubic;
            g.InterpolationMode = InterpolationMode.Low;
            //g.CompositingMode = CompositingMode.SourceOver;
            //g.CompositingQuality = CompositingQuality.HighQuality;
            g.CompositingQuality = CompositingQuality.HighSpeed;
            g.TextRenderingHint = System.Drawing.Text.TextRenderingHint.AntiAlias;
            g.SmoothingMode = SmoothingMode.AntiAlias;

            //绘制渐变背景
            Rectangle rect = new Rectangle(0, 0, image.Width, image.Height);
            Brush brushBack = new LinearGradientBrush(rect, Color.FromArgb(rand.Next(150, 256), 255, 255), Color.FromArgb(255, rand.Next(150, 256), 255), rand.Next(90));
            g.FillRectangle(brushBack, rect);

            //绘制干扰曲线
            for (int i = 0; i < 2; i++) {
                Point p1 = new Point(0, rand.Next(image.Height));
                Point p2 = new Point(rand.Next(image.Width), rand.Next(image.Height));
                Point p3 = new Point(rand.Next(image.Width), rand.Next(image.Height));
                Point p4 = new Point(image.Width, rand.Next(image.Height));
                Point[] p = { p1, p2, p3, p4 };
                Pen pen = new Pen(Color.Gray, 1);
                g.DrawBeziers(pen, p);
            }

            //逐个绘制文字
            for (int i = 0; i < str.Length; i++) {
                string strChar = str.Substring(i, 1);
                int deg = rand.Next(-15, 15);
                float x = (image.Width / str.Length / 2) + (image.Width / str.Length) * i;
                float y = image.Height / 2;
                //随机字体大小
                Font font = new Font("Consolas", rand.Next(16, 24), FontStyle.Regular);
                SizeF size = g.MeasureString(strChar, font);
                Matrix m = new Matrix();
                //旋转
                m.RotateAt(deg, new PointF(x, y), MatrixOrder.Append);
                //扭曲
                m.Shear(rand.Next(-10, 10) * 0.03f, 0);
                g.Transform = m;
                //随机渐变画笔
                Brush brushPen = new LinearGradientBrush(rect, Color.FromArgb(rand.Next(0, 256), 0, 0), Color.FromArgb(0, 0, rand.Next(0, 256)), rand.Next(90));
                g.DrawString(str.Substring(i, 1), font, brushPen, new PointF(x - size.Width / 2, y - size.Height / 2));

                g.Transform = new Matrix();
            }

            g.Save();
            HttpContext.Current.Response.ContentType = "image/jpeg";
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.BufferOutput = true;
            image.Save(HttpContext.Current.Response.OutputStream, ImageFormat.Jpeg);
            g.Dispose();
            image.Dispose();
            HttpContext.Current.Response.Flush();
        }
    }
}
