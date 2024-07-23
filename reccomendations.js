function getNutrientRecommendation(status){const statusKey=status.replace(/<[^>]*>/g,'').trim();const recommendations={"Insufficient Nutrients":{en:`
            • Test soil pH and adjust if necessary for better nutrient availability<br>
            • Monitor plants closely for signs of deficiency<br>
            • Apply a balanced NPK fertilizer immediately<br>
            • Consider foliar feeding for quick nutrient uptake<br>
            • Increase organic matter in soil through mulching or compost
            `,vi:`
            • Kiểm tra độ pH của đất và điều chỉnh nếu cần thiết để cải thiện khả năng hấp thụ dinh dưỡng<br>
            • Theo dõi chặt chẽ cây trồng để phát hiện dấu hiệu thiếu dinh dưỡng<br>
            • Áp dụng ngay phân bón NPK cân bằng<br>
            • Cân nhắc sử dụng phân bón lá để cây hấp thụ dinh dưỡng nhanh chóng<br>
            • Tăng lượng chất hữu cơ trong đất thông qua việc phủ mulch hoặc bón compost
            `},"Thiếu dinh dưỡng":{en:`
            • Test soil pH and adjust if necessary for better nutrient availability<br>
            • Monitor plants closely for signs of deficiency<br>
            • Apply a balanced NPK fertilizer immediately<br>
            • Consider foliar feeding for quick nutrient uptake<br>
            • Increase organic matter in soil through mulching or compost
            `,vi:`
            • Kiểm tra độ pH của đất và điều chỉnh nếu cần thiết để cải thiện khả năng hấp thụ dinh dưỡng<br>
            • Theo dõi chặt chẽ cây trồng để phát hiện dấu hiệu thiếu dinh dưỡng<br>
            • Áp dụng ngay phân bón NPK cân bằng<br>
            • Cân nhắc sử dụng phân bón lá để cây hấp thụ dinh dưỡng nhanh chóng<br>
            • Tăng lượng chất hữu cơ trong đất thông qua việc phủ mulch hoặc bón compost
            `},"Average Nutrients":{en:`
            • Maintain current fertilization schedule<br>
            • Apply a light dose of balanced NPK fertilizer<br>
            • Continue regular soil testing to monitor nutrient levels<br>
            • Implement crop rotation or cover crops to improve soil health<br>
            • Use organic mulch to retain moisture and slowly release nutrients
            `,vi:`
            • Duy trì lịch bón phân hiện tại<br>
            • Áp dụng một liều nhẹ phân bón NPK cân bằng<br>
            • Tiếp tục kiểm tra đất thường xuyên để theo dõi mức dinh dưỡng<br>
            • Thực hiện luân canh hoặc trồng cây phủ đất để cải thiện sức khỏe đất<br>
            • Sử dụng lớp phủ hữu cơ để giữ ẩm và giải phóng dinh dưỡng từ từ
            `},"Dinh dưỡng trung bình":{en:`
            • Maintain current fertilization schedule<br>
            • Apply a light dose of balanced NPK fertilizer<br>
            • Continue regular soil testing to monitor nutrient levels<br>
            • Implement crop rotation or cover crops to improve soil health<br>
            • Use organic mulch to retain moisture and slowly release nutrients
            `,vi:`
            • Duy trì lịch bón phân hiện tại<br>
            • Áp dụng một liều nhẹ phân bón NPK cân bằng<br>
            • Tiếp tục kiểm tra đất thường xuyên để theo dõi mức dinh dưỡng<br>
            • Thực hiện luân canh hoặc trồng cây phủ đất để cải thiện sức khỏe đất<br>
            • Sử dụng lớp phủ hữu cơ để giữ ẩm và giải phóng dinh dưỡng từ từ
            `},"Adequate Nutrients":{en:`
            • Maintain current soil management practices<br>
            • Monitor plant growth and yield to ensure continued optimal nutrition<br>
            • Consider slight reduction in fertilizer application to prevent excess<br>
            • Focus on maintaining soil organic matter through mulching<br>
            • Implement precision farming techniques for efficient nutrient use
            `,vi:`
            • Duy trì các phương pháp quản lý đất hiện tại<br>
            • Theo dõi sự phát triển và năng suất của cây để đảm bảo dinh dưỡng tối ưu liên tục<br>
            • Cân nhắc giảm nhẹ lượng phân bón để tránh dư thừa<br>
            • Tập trung vào việc duy trì chất hữu cơ trong đất thông qua việc phủ mulch<br>
            • Áp dụng kỹ thuật canh tác chính xác để sử dụng dinh dưỡng hiệu quả
            `},"Chất dinh dưỡng đầy đủ":{en:`
            • Maintain current soil management practices<br>
            • Monitor plant growth and yield to ensure continued optimal nutrition<br>
            • Consider slight reduction in fertilizer application to prevent excess<br>
            • Focus on maintaining soil organic matter through mulching<br>
            • Implement precision farming techniques for efficient nutrient use
            `,vi:`
            • Duy trì các phương pháp quản lý đất hiện tại<br>
            • Theo dõi sự phát triển và năng suất của cây để đảm bảo dinh dưỡng tối ưu liên tục<br>
            • Cân nhắc giảm nhẹ lượng phân bón để tránh dư thừa<br>
            • Tập trung vào việc duy trì chất hữu cơ trong đất thông qua việc phủ mulch<br>
            • Áp dụng kỹ thuật canh tác chính xác để sử dụng dinh dưỡng hiệu quả
            `},"Excess Nutrients":{en:`
            • Consider adjusting soil pH to reduce nutrient availability if chronic<br>
            • Monitor for nutrient toxicity symptoms and soil/water pollution<br>
            • Stop fertilizer application immediately<br>
            • Increase irrigation to help leach excess nutrients (carefully to avoid runoff)<br>
            • Plant cover crops or green manures to absorb excess nutrients
            `,vi:`
            • Cân nhắc điều chỉnh độ pH của đất để giảm khả năng hấp thụ dinh dưỡng nếu tình trạng kéo dài<br>
            • Theo dõi các triệu chứng ngộ độc dinh dưỡng và ô nhiễm đất/nước<br>
            • Ngừng ngay việc bón phân<br>
            • Tăng cường tưới tiêu để giúp rửa trôi dinh dưỡng dư thừa (cẩn thận để tránh chảy tràn)<br>
            • Trồng cây phủ đất hoặc cây phân xanh để hấp thụ dinh dưỡng dư thừa
            `},"Dư dinh dưỡng":{en:`
            • Consider adjusting soil pH to reduce nutrient availability if chronic<br>
            • Monitor for nutrient toxicity symptoms and soil/water pollution<br>
            • Stop fertilizer application immediately<br>
            • Increase irrigation to help leach excess nutrients (carefully to avoid runoff)<br>
            • Plant cover crops or green manures to absorb excess nutrients
            `,vi:`
            • Cân nhắc điều chỉnh độ pH của đất để giảm khả năng hấp thụ dinh dưỡng nếu tình trạng kéo dài<br>
            • Theo dõi các triệu chứng ngộ độc dinh dưỡng và ô nhiễm đất/nước<br>
            • Ngừng ngay việc bón phân<br>
            • Tăng cường tưới tiêu để giúp rửa trôi dinh dưỡng dư thừa (cẩn thận để tránh chảy tràn)<br>
            • Trồng cây phủ đất hoặc cây phân xanh để hấp thụ dinh dưỡng dư thừa
            `},"No data":{en:`
            • No recommendations at the moment.
            `,vi:`
            • Hiện tại không có khuyến nghị.
            `},"Không có dữ liệu":{en:`
            • No recommendations at the moment.
            `,vi:`
            • Hiện tại không có khuyến nghị.
            `}};return recommendations[statusKey]||{en:"No specific recommendations available.",vi:"Không có khuyến nghị cụ thể."};}
function getMoistureRecommendation(status){const statusKey=status.replace(/<[^>]*>/g,'').trim();const recommendations={"Very dry":{en:`
            • Increase irrigation immediately<br>
            • Apply mulch to retain soil moisture<br>
            • Consider installing drip irrigation for efficient water use<br>
            • Use drought-resistant varieties if persistent<br>
            • Monitor plants closely for signs of water stress
            `,vi:`
            • Tăng cường tưới nước ngay lập tức<br>
            • Áp dụng lớp phủ mulch để giữ ẩm đất<br>
            • Cân nhắc lắp đặt hệ thống tưới nhỏ giọt để sử dụng nước hiệu quả<br>
            • Sử dụng giống cây chịu hạn nếu tình trạng kéo dài<br>
            • Theo dõi chặt chẽ cây trồng để phát hiện dấu hiệu thiếu nước
            `},"Rất khô":{en:`
            • Increase irrigation immediately<br>
            • Apply mulch to retain soil moisture<br>
            • Consider installing drip irrigation for efficient water use<br>
            • Use drought-resistant varieties if persistent<br>
            • Monitor plants closely for signs of water stress
            `,vi:`
            • Tăng cường tưới nước ngay lập tức<br>
            • Áp dụng lớp phủ mulch để giữ ẩm đất<br>
            • Cân nhắc lắp đặt hệ thống tưới nhỏ giọt để sử dụng nước hiệu quả<br>
            • Sử dụng giống cây chịu hạn nếu tình trạng kéo dài<br>
            • Theo dõi chặt chẽ cây trồng để phát hiện dấu hiệu thiếu nước
            `},"Lack of water":{en:`
            • Increase watering frequency<br>
            • Check and adjust irrigation system if necessary<br>
            • Apply organic matter to improve soil water retention<br>
            • Use mulch to reduce evaporation<br>
            • Consider temporary shade for sensitive plants
            `,vi:`
            • Tăng tần suất tưới nước<br>
            • Kiểm tra và điều chỉnh hệ thống tưới tiêu nếu cần<br>
            • Bổ sung chất hữu cơ để cải thiện khả năng giữ nước của đất<br>
            • Sử dụng lớp phủ mulch để giảm bay hơi<br>
            • Cân nhắc tạo bóng râm tạm thời cho cây nhạy cảm
            `},"Thiếu nước":{en:`
            • Increase watering frequency<br>
            • Check and adjust irrigation system if necessary<br>
            • Apply organic matter to improve soil water retention<br>
            • Use mulch to reduce evaporation<br>
            • Consider temporary shade for sensitive plants
            `,vi:`
            • Tăng tần suất tưới nước<br>
            • Kiểm tra và điều chỉnh hệ thống tưới tiêu nếu cần<br>
            • Bổ sung chất hữu cơ để cải thiện khả năng giữ nước của đất<br>
            • Sử dụng lớp phủ mulch để giảm bay hơi<br>
            • Cân nhắc tạo bóng râm tạm thời cho cây nhạy cảm
            `},"Enough moisture":{en:`
            • Maintain current irrigation practices<br>
            • Monitor weather forecasts to adjust watering as needed<br>
            • Continue using mulch to retain moisture<br>
            • Ensure proper drainage to prevent waterlogging<br>
            • Regularly check soil moisture to maintain optimal levels
            `,vi:`
            • Duy trì phương pháp tưới tiêu hiện tại<br>
            • Theo dõi dự báo thời tiết để điều chỉnh tưới nước khi cần<br>
            • Tiếp tục sử dụng lớp phủ mulch để giữ ẩm<br>
            • Đảm bảo thoát nước tốt để tránh ngập úng<br>
            • Thường xuyên kiểm tra độ ẩm đất để duy trì mức tối ưu
            `},"Đủ ẩm":{en:`
            • Maintain current irrigation practices<br>
            • Monitor weather forecasts to adjust watering as needed<br>
            • Continue using mulch to retain moisture<br>
            • Ensure proper drainage to prevent waterlogging<br>
            • Regularly check soil moisture to maintain optimal levels
            `,vi:`
            • Duy trì phương pháp tưới tiêu hiện tại<br>
            • Theo dõi dự báo thời tiết để điều chỉnh tưới nước khi cần<br>
            • Tiếp tục sử dụng lớp phủ mulch để giữ ẩm<br>
            • Đảm bảo thoát nước tốt để tránh ngập úng<br>
            • Thường xuyên kiểm tra độ ẩm đất để duy trì mức tối ưu
            `},"Excess water":{en:`
            • Reduce irrigation immediately<br>
            • Improve soil drainage if necessary<br>
            • Avoid overwatering, especially during rainy periods<br>
            • Check for and fix any leaks in irrigation system<br>
            • Monitor for signs of root rot or fungal diseases
            `,vi:`
            • Giảm tưới nước ngay lập tức<br>
            • Cải thiện thoát nước đất nếu cần<br>
            • Tránh tưới quá nhiều, đặc biệt là trong mùa mưa<br>
            • Kiểm tra và sửa chữa bất kỳ rò rỉ nào trong hệ thống tưới<br>
            • Theo dõi các dấu hiệu thối rễ hoặc bệnh nấm
            `},"Thừa nước":{en:`
            • Reduce irrigation immediately<br>
            • Improve soil drainage if necessary<br>
            • Avoid overwatering, especially during rainy periods<br>
            • Check for and fix any leaks in irrigation system<br>
            • Monitor for signs of root rot or fungal diseases
            `,vi:`
            • Giảm tưới nước ngay lập tức<br>
            • Cải thiện thoát nước đất nếu cần<br>
            • Tránh tưới quá nhiều, đặc biệt là trong mùa mưa<br>
            • Kiểm tra và sửa chữa bất kỳ rò rỉ nào trong hệ thống tưới<br>
            • Theo dõi các dấu hiệu thối rễ hoặc bệnh nấm
            `},"No data":{en:`
            • No recommendations at the moment.
            `,vi:`
            • Hiện tại không có khuyến nghị.
            `},"Không có dữ liệu":{en:`
            • No recommendations at the moment.
            `,vi:`
            • Hiện tại không có khuyến nghị.
            `}};return recommendations[statusKey]||{en:"No specific recommendations available.",vi:"Không có khuyến nghị cụ thể."};}
function getPHRecommendation(status){const statusKey=status.replace(/<[^>]*>/g,'').trim();const recommendations={"Very Acidic":{en:`
            • Apply lime to raise soil pH<br>
            • Use dolomitic lime if magnesium is also low<br>
            • Avoid using acidifying fertilizers<br>
            • Consider growing acid-loving plants if pH can't be raised<br>
            • Monitor pH regularly and adjust as needed
            `,vi:`
            • Bón vôi để tăng độ pH của đất<br>
            • Sử dụng vôi dolomit nếu lượng magiê cũng thấp<br>
            • Tránh sử dụng phân bón làm chua đất<br>
            • Cân nhắc trồng các loại cây ưa axit nếu không thể tăng pH<br>
            • Theo dõi pH thường xuyên và điều chỉnh khi cần thiết
            `},"Rất axit":{en:`
            • Apply lime to raise soil pH<br>
            • Use dolomitic lime if magnesium is also low<br>
            • Avoid using acidifying fertilizers<br>
            • Consider growing acid-loving plants if pH can't be raised<br>
            • Monitor pH regularly and adjust as needed
            `,vi:`
            • Bón vôi để tăng độ pH của đất<br>
            • Sử dụng vôi dolomit nếu lượng magiê cũng thấp<br>
            • Tránh sử dụng phân bón làm chua đất<br>
            • Cân nhắc trồng các loại cây ưa axit nếu không thể tăng pH<br>
            • Theo dõi pH thường xuyên và điều chỉnh khi cần thiết
            `},"Acidic":{en:`
            • Apply lime in smaller quantities to gradually raise pH<br>
            • Use organic matter to buffer pH changes<br>
            • Choose plants that tolerate slightly acidic conditions<br>
            • Avoid over-application of nitrogen fertilizers<br>
            • Test soil regularly to track pH changes
            `,vi:`
            • Bón vôi với số lượng nhỏ hơn để tăng pH từ từ<br>
            • Sử dụng chất hữu cơ để đệm thay đổi pH<br>
            • Chọn các loại cây chịu được điều kiện hơi axit<br>
            • Tránh bón quá nhiều phân đạm<br>
            • Kiểm tra đất thường xuyên để theo dõi sự thay đổi pH
            `},"Axit":{en:`
            • Apply lime in smaller quantities to gradually raise pH<br>
            • Use organic matter to buffer pH changes<br>
            • Choose plants that tolerate slightly acidic conditions<br>
            • Avoid over-application of nitrogen fertilizers<br>
            • Test soil regularly to track pH changes
            `,vi:`
            • Bón vôi với số lượng nhỏ hơn để tăng pH từ từ<br>
            • Sử dụng chất hữu cơ để đệm thay đổi pH<br>
            • Chọn các loại cây chịu được điều kiện hơi axit<br>
            • Tránh bón quá nhiều phân đạm<br>
            • Kiểm tra đất thường xuyên để theo dõi sự thay đổi pH
            `},"Slightly Acidic":{en:`
            • Monitor pH levels closely<br>
            • Use pH-neutral fertilizers<br>
            • Add organic matter to stabilize soil pH<br>
            • Consider minor lime applications if pH continues to drop<br>
            • Choose plants suitable for slightly acidic soils
            `,vi:`
            • Theo dõi chặt chẽ mức pH<br>
            • Sử dụng phân bón trung tính pH<br>
            • Bổ sung chất hữu cơ để ổn định pH đất<br>
            • Cân nhắc bón vôi nhẹ nếu pH tiếp tục giảm<br>
            • Chọn các loại cây phù hợp với đất hơi axit
            `},"Hơi axit":{en:`
            • Monitor pH levels closely<br>
            • Use pH-neutral fertilizers<br>
            • Add organic matter to stabilize soil pH<br>
            • Consider minor lime applications if pH continues to drop<br>
            • Choose plants suitable for slightly acidic soils
            `,vi:`
            • Theo dõi chặt chẽ mức pH<br>
            • Sử dụng phân bón trung tính pH<br>
            • Bổ sung chất hữu cơ để ổn định pH đất<br>
            • Cân nhắc bón vôi nhẹ nếu pH tiếp tục giảm<br>
            • Chọn các loại cây phù hợp với đất hơi axit
            `},"Neutral":{en:`
            • Maintain current soil management practices<br>
            • Use balanced fertilizers to avoid pH shifts<br>
            • Monitor pH regularly to ensure it stays neutral<br>
            • Add organic matter to improve soil buffering capacity<br>
            • Ideal for most crops - no major adjustments needed
            `,vi:`
            • Duy trì các phương pháp quản lý đất hiện tại<br>
            • Sử dụng phân bón cân bằng để tránh thay đổi pH<br>
            • Theo dõi pH thường xuyên để đảm bảo nó giữ ở mức trung tính<br>
            • Bổ sung chất hữu cơ để cải thiện khả năng đệm của đất<br>
            • Lý tưởng cho hầu hết các loại cây trồng - không cần điều chỉnh lớn
            `},"Trung tính":{en:`
            • Maintain current soil management practices<br>
            • Use balanced fertilizers to avoid pH shifts<br>
            • Monitor pH regularly to ensure it stays neutral<br>
            • Add organic matter to improve soil buffering capacity<br>
            • Ideal for most crops - no major adjustments needed
            `,vi:`
            • Duy trì các phương pháp quản lý đất hiện tại<br>
            • Sử dụng phân bón cân bằng để tránh thay đổi pH<br>
            • Theo dõi pH thường xuyên để đảm bảo nó giữ ở mức trung tính<br>
            • Bổ sung chất hữu cơ để cải thiện khả năng đệm của đất<br>
            • Lý tưởng cho hầu hết các loại cây trồng - không cần điều chỉnh lớn
            `},"Slightly Alkaline":{en:`
            • Monitor pH levels closely<br>
            • Use acidifying fertilizers if needed<br>
            • Add organic matter to help lower pH gradually<br>
            • Consider adding elemental sulfur in small amounts<br>
            • Choose plants tolerant of slightly alkaline conditions
            `,vi:`
            • Theo dõi chặt chẽ mức pH<br>
            • Sử dụng phân bón làm chua nếu cần<br>
            • Bổ sung chất hữu cơ để giúp giảm pH từ từ<br>
            • Cân nhắc bổ sung lưu huỳnh nguyên tố với số lượng nhỏ<br>
            • Chọn các loại cây chịu được điều kiện hơi kiềm
            `},"Hơi kiềm":{en:`
            • Monitor pH levels closely<br>
            • Use acidifying fertilizers if needed<br>
            • Add organic matter to help lower pH gradually<br>
            • Consider adding elemental sulfur in small amounts<br>
            • Choose plants tolerant of slightly alkaline conditions
            `,vi:`
            • Theo dõi chặt chẽ mức pH<br>
            • Sử dụng phân bón làm chua nếu cần<br>
            • Bổ sung chất hữu cơ để giúp giảm pH từ từ<br>
            • Cân nhắc bổ sung lưu huỳnh nguyên tố với số lượng nhỏ<br>
            • Chọn các loại cây chịu được điều kiện hơi kiềm
            `},"Alkaline":{en:`
            • Apply elemental sulfur to lower soil pH<br>
            • Use acidifying fertilizers like ammonium sulfate<br>
            • Add organic matter to improve soil structure and pH<br>
            • Consider growing alkaline-tolerant plants<br>
            • Test soil regularly and adjust treatments as needed
            `,vi:`
            • Bón lưu huỳnh nguyên tố để giảm pH đất<br>
            • Sử dụng phân bón làm chua như amoni sulfat<br>
            • Bổ sung chất hữu cơ để cải thiện cấu trúc đất và pH<br>
            • Cân nhắc trồng các loại cây chịu kiềm<br>
            • Kiểm tra đất thường xuyên và điều chỉnh biện pháp khi cần thiết
            `},"Kiềm":{en:`
            • Apply elemental sulfur to lower soil pH<br>
            • Use acidifying fertilizers like ammonium sulfate<br>
            • Add organic matter to improve soil structure and pH<br>
            • Consider growing alkaline-tolerant plants<br>
            • Test soil regularly and adjust treatments as needed
            `,vi:`
            • Bón lưu huỳnh nguyên tố để giảm pH đất<br>
            • Sử dụng phân bón làm chua như amoni sulfat<br>
            • Bổ sung chất hữu cơ để cải thiện cấu trúc đất và pH<br>
            • Cân nhắc trồng các loại cây chịu kiềm<br>
            • Kiểm tra đất thường xuyên và điều chỉnh biện pháp khi cần thiết
            `},"Very Alkaline":{en:`
            • Apply larger amounts of elemental sulfur to lower pH<br>
            • Use acid-forming organic materials (e.g., peat moss)<br>
            • Avoid using alkaline water for irrigation if possible<br>
            • Consider raised beds with controlled soil pH for sensitive crops<br>
            • Monitor pH changes closely and adjust strategy as needed
            `,vi:`
            • Bón lượng lớn lưu huỳnh nguyên tố để giảm pH<br>
            • Sử dụng các vật liệu hữu cơ tạo axit (ví dụ: rêu bùn)<br>
            • Tránh sử dụng nước kiềm để tưới nếu có thể<br>
            • Cân nhắc sử dụng luống trồng nổi với pH đất được kiểm soát cho cây trồng nhạy cảm<br>
            • Theo dõi chặt chẽ sự thay đổi pH và điều chỉnh chiến lược khi cần thiết
            `},"Rất kiềm":{en:`
            • Apply larger amounts of elemental sulfur to lower pH<br>
            • Use acid-forming organic materials (e.g., peat moss)<br>
            • Avoid using alkaline water for irrigation if possible<br>
            • Consider raised beds with controlled soil pH for sensitive crops<br>
            • Monitor pH changes closely and adjust strategy as needed
            `,vi:`
            • Bón lượng lớn lưu huỳnh nguyên tố để giảm pH<br>
            • Sử dụng các vật liệu hữu cơ tạo axit (ví dụ: rêu bùn)<br>
            • Tránh sử dụng nước kiềm để tưới nếu có thể<br>
            • Cân nhắc sử dụng luống trồng nổi với pH đất được kiểm soát cho cây trồng nhạy cảm<br>
            • Theo dõi chặt chẽ sự thay đổi pH và điều chỉnh chiến lược khi cần thiết
            `},"No data":{en:`
            • No recommendations at the moment. Conduct a soil pH test.
            `,vi:`
            • Hiện tại không có khuyến nghị. Tiến hành kiểm tra độ pH của đất.
            `},"Không có dữ liệu":{en:`
            • No recommendations at the moment. Conduct a soil pH test.
            `,vi:`
            • Hiện tại không có khuyến nghị. Tiến hành kiểm tra độ pH của đất.
            `}};return recommendations[statusKey]||{en:"No specific recommendations available.",vi:"Không có khuyến nghị cụ thể."};}
function getTempRecommendation(status){const statusKey=status.replace(/<[^>]*>/g,'').trim();const recommendations={"Normal Temp":{en:`
            • Maintain current temperature management practices<br>
            • Monitor for any sudden changes in temperature<br>
            • Ensure proper air circulation in the growing area<br>
            • Continue regular plant health checks<br>
            • Adjust watering based on temperature and plant needs
            `,vi:`
            • Duy trì các biện pháp quản lý nhiệt độ hiện tại<br>
            • Theo dõi bất kỳ thay đổi đột ngột nào về nhiệt độ<br>
            • Đảm bảo lưu thông không khí đúng cách trong khu vực trồng trọt<br>
            • Tiếp tục kiểm tra sức khỏe cây trồng thường xuyên<br>
            • Điều chỉnh tưới nước dựa trên nhiệt độ và nhu cầu của cây
            `},"Nhiệt độ bình thường":{en:`
            • Maintain current temperature management practices<br>
            • Monitor for any sudden changes in temperature<br>
            • Ensure proper air circulation in the growing area<br>
            • Continue regular plant health checks<br>
            • Adjust watering based on temperature and plant needs
            `,vi:`
            • Duy trì các biện pháp quản lý nhiệt độ hiện tại<br>
            • Theo dõi bất kỳ thay đổi đột ngột nào về nhiệt độ<br>
            • Đảm bảo lưu thông không khí đúng cách trong khu vực trồng trọt<br>
            • Tiếp tục kiểm tra sức khỏe cây trồng thường xuyên<br>
            • Điều chỉnh tưới nước dựa trên nhiệt độ và nhu cầu của cây
            `},"Average Temp":{en:`
            • Maintain temperature between 60-70°F (15-21°C) for optimal growth<br>
            • Ensure proper shade management to regulate temperature<br>
            • Monitor soil moisture, as average temperatures can affect water retention<br>
            • Continue regular pest and disease checks, especially for  berry borer<br>
            • Adjust fertilization schedule based on growth rate and season
            `,vi:`
            • Duy trì nhiệt độ từ 15-21°C để tăng trưởng tối ưu<br>
            • Đảm bảo quản lý bóng râm phù hợp để điều chỉnh nhiệt độ<br>
            • Theo dõi độ ẩm đất, vì nhiệt độ trung bình có thể ảnh hưởng đến khả năng giữ nước<br>
            • Tiếp tục kiểm tra sâu bệnh thường xuyên, đặc biệt là mọt đục quả cà phê<br>
            • Điều chỉnh lịch bón phân dựa trên tốc độ tăng trưởng và mùa vụ
            `},"Nhiệt độ trung bình":{en:`
            • Maintain temperature between 60-70°F (15-21°C) for optimal growth<br>
            • Ensure proper shade management to regulate temperature<br>
            • Monitor soil moisture, as average temperatures can affect water retention<br>
            • Continue regular pest and disease checks, especially for  berry borer<br>
            • Adjust fertilization schedule based on growth rate and season
            `,vi:`
            • Duy trì nhiệt độ từ 15-21°C để tăng trưởng tối ưu<br>
            • Đảm bảo quản lý bóng râm phù hợp để điều chỉnh nhiệt độ<br>
            • Theo dõi độ ẩm đất, vì nhiệt độ trung bình có thể ảnh hưởng đến khả năng giữ nước<br>
            • Tiếp tục kiểm tra sâu bệnh thường xuyên, đặc biệt là mọt đục quả cà phê<br>
            • Điều chỉnh lịch bón phân dựa trên tốc độ tăng trưởng và mùa vụ
            `},"Low Temp":{en:`
            • Protect plants from frost if temperature drops further<br>
            • Use row covers or cold frames for sensitive crops<br>
            • Delay planting of warm-season crops if early in the season<br>
            • Reduce watering frequency to prevent waterlogging<br>
            • Consider using heating systems in greenhouses if applicable
            `,vi:`
            • Bảo vệ cây khỏi sương giá nếu nhiệt độ giảm thêm<br>
            • Sử dụng màn phủ hoặc khung lạnh cho cây trồng nhạy cảm<br>
            • Trì hoãn việc trồng cây mùa ấm nếu đang ở đầu mùa<br>
            • Giảm tần suất tưới nước để tránh ngập úng<br>
            • Cân nhắc sử dụng hệ thống sưởi trong nhà kính nếu có thể
            `},"Nhiệt độ thấp":{en:`
            • Protect plants from frost if temperature drops further<br>
            • Use row covers or cold frames for sensitive crops<br>
            • Delay planting of warm-season crops if early in the season<br>
            • Reduce watering frequency to prevent waterlogging<br>
            • Consider using heating systems in greenhouses if applicable
            `,vi:`
            • Bảo vệ cây khỏi sương giá nếu nhiệt độ giảm thêm<br>
            • Sử dụng màn phủ hoặc khung lạnh cho cây trồng nhạy cảm<br>
            • Trì hoãn việc trồng cây mùa ấm nếu đang ở đầu mùa<br>
            • Giảm tần suất tưới nước để tránh ngập úng<br>
            • Cân nhắc sử dụng hệ thống sưởi trong nhà kính nếu có thể
            `},"High Temp":{en:`
            • Increase watering frequency to prevent dehydration<br>
            • Provide shade for sensitive plants during peak heat hours<br>
            • Mulch around plants to retain soil moisture and cool roots<br>
            • Avoid fertilizing during extreme heat to prevent stress<br>
            • Monitor for signs of heat stress and adjust care accordingly
            `,vi:`
            • Tăng tần suất tưới nước để ngăn ngừa mất nước<br>
            • Tạo bóng râm cho cây nhạy cảm trong giờ nắng nóng cao điểm<br>
            • Phủ mulch quanh cây để giữ ẩm đất và làm mát rễ<br>
            • Tránh bón phân trong thời tiết nắng nóng cực độ để tránh gây stress cho cây<br>
            • Theo dõi các dấu hiệu stress do nhiệt và điều chỉnh chăm sóc phù hợp
            `},"Nhiệt độ cao":{en:`
            • Increase watering frequency to prevent dehydration<br>
            • Provide shade for sensitive plants during peak heat hours<br>
            • Mulch around plants to retain soil moisture and cool roots<br>
            • Avoid fertilizing during extreme heat to prevent stress<br>
            • Monitor for signs of heat stress and adjust care accordingly
            `,vi:`
            • Tăng tần suất tưới nước để ngăn ngừa mất nước<br>
            • Tạo bóng râm cho cây nhạy cảm trong giờ nắng nóng cao điểm<br>
            • Phủ mulch quanh cây để giữ ẩm đất và làm mát rễ<br>
            • Tránh bón phân trong thời tiết nắng nóng cực độ để tránh gây stress cho cây<br>
            • Theo dõi các dấu hiệu stress do nhiệt và điều chỉnh chăm sóc phù hợp
            `},"No data":{en:`
            • No recommendations at the moment. Check temperature monitoring equipment.
            `,vi:`
            • Hiện tại không có khuyến nghị. Kiểm tra thiết bị theo dõi nhiệt độ.
            `},"Không có dữ liệu":{en:`
            • No recommendations at the moment. Check temperature monitoring equipment.
            `,vi:`
            • Hiện tại không có khuyến nghị. Kiểm tra thiết bị theo dõi nhiệt độ.
            `}};return recommendations[statusKey]||{en:"No specific recommendations available.",vi:"Không có khuyến nghị cụ thể."};}
function getNtsRecommendation(status){const statusKey=status.replace(/<[^>]*>/g,'').trim();const recommendations={"Average NTS":{en:`
            • Continue current nitrogen application rates<br>
            • Monitor NTS levels bi-weekly<br>
            • Implement split applications of nitrogen fertilizer<br>
            • Use slow-release nitrogen sources<br>
            • Maintain soil organic matter through cover cropping or mulching
            `,vi:`
            • Tiếp tục tỷ lệ bón đạm hiện tại<br>
            • Theo dõi mức NTS hai tuần một lần<br>
            • Thực hiện bón phân đạm theo nhiều đợt<br>
            • Sử dụng nguồn đạm phóng thích chậm<br>
            • Duy trì chất hữu cơ trong đất thông qua trồng cây phủ đất hoặc phủ mulch
            `},"NTS Trung bình":{en:`
            • Continue current nitrogen application rates<br>
            • Monitor NTS levels bi-weekly<br>
            • Implement split applications of nitrogen fertilizer<br>
            • Use slow-release nitrogen sources<br>
            • Maintain soil organic matter through cover cropping or mulching
            `,vi:`
            • Tiếp tục tỷ lệ bón đạm hiện tại<br>
            • Theo dõi mức NTS hai tuần một lần<br>
            • Thực hiện bón phân đạm theo nhiều đợt<br>
            • Sử dụng nguồn đạm phóng thích chậm<br>
            • Duy trì chất hữu cơ trong đất thông qua trồng cây phủ đất hoặc phủ mulch
            `},"Very Low NTS":{en:`
            • Increase nitrogen application by 25-30%<br>
            • Apply foliar nitrogen (2-3% urea solution) weekly<br>
            • Add organic matter (compost, manure) at 5-10 tons/ha<br>
            • Test for secondary nutrient deficiencies (S, Mg, Ca)<br>
            • Improve soil pH if below 6.0 using lime
            `,vi:`
            • Tăng lượng bón đạm lên 25-30%<br>
            • Phun đạm qua lá (dung dịch urê 2-3%) hàng tuần<br>
            • Bổ sung chất hữu cơ (phân ủ, phân chuồng) ở mức 5-10 tấn/ha<br>
            • Kiểm tra tình trạng thiếu các chất dinh dưỡng thứ cấp (S, Mg, Ca)<br>
            • Cải thiện độ pH đất nếu dưới 6.0 bằng cách bón vôi
            `},"NTS Nghèo":{en:`
            • Increase nitrogen application by 25-30%<br>
            • Apply foliar nitrogen (2-3% urea solution) weekly<br>
            • Add organic matter (compost, manure) at 5-10 tons/ha<br>
            • Test for secondary nutrient deficiencies (S, Mg, Ca)<br>
            • Improve soil pH if below 6.0 using lime
            `,vi:`
            • Tăng lượng bón đạm lên 25-30%<br>
            • Phun đạm qua lá (dung dịch urê 2-3%) hàng tuần<br>
            • Bổ sung chất hữu cơ (phân ủ, phân chuồng) ở mức 5-10 tấn/ha<br>
            • Kiểm tra tình trạng thiếu các chất dinh dưỡng thứ cấp (S, Mg, Ca)<br>
            • Cải thiện độ pH đất nếu dưới 6.0 bằng cách bón vôi
            `},"High NTS":{en:`
            • Reduce nitrogen application by 20-25%<br>
            • Increase potassium and phosphorus applications<br>
            • Monitor leaf tissue for potential toxicity symptoms<br>
            • Improve soil drainage; consider installing tile drainage<br>
            • Plant leguminous cover crops (e.g., clover, vetch) in rotation
            `,vi:`
            • Giảm lượng bón đạm xuống 20-25%<br>
            • Tăng cường bón kali và phốt pho<br>
            • Theo dõi mô lá để phát hiện các triệu chứng ngộ độc tiềm ẩn<br>
            • Cải thiện thoát nước đất; cân nhắc lắp đặt hệ thống thoát nước ngầm<br>
            • Trồng luân canh các cây họ đậu phủ đất (ví dụ: cỏ ba lá, đậu tằm)
            `},"NTS Cao":{en:`
            • Reduce nitrogen application by 20-25%<br>
            • Increase potassium and phosphorus applications<br>
            • Monitor leaf tissue for potential toxicity symptoms<br>
            • Improve soil drainage; consider installing tile drainage<br>
            • Plant leguminous cover crops (e.g., clover, vetch) in rotation
            `,vi:`
            • Giảm lượng bón đạm xuống 20-25%<br>
            • Tăng cường bón kali và phốt pho<br>
            • Theo dõi mô lá để phát hiện các triệu chứng ngộ độc tiềm ẩn<br>
            • Cải thiện thoát nước đất; cân nhắc lắp đặt hệ thống thoát nước ngầm<br>
            • Trồng luân canh các cây họ đậu phủ đất (ví dụ: cỏ ba lá, đậu tằm)
            `},"No data":{en:`
            • Check NTS sensors for malfunction or calibration issues<br>
            • Perform manual soil tests to assess nitrogen levels<br>
            • Review recent fertilization and irrigation records<br>
            • Inspect crops for visual signs of nitrogen deficiency or excess<br>
            • Contact technical support if equipment issues persist
            `,vi:`
            • Kiểm tra các cảm biến NTS xem có bị hỏng hoặc vấn đề hiệu chuẩn không<br>
            • Thực hiện xét nghiệm đất thủ công để đánh giá mức đạm<br>
            • Xem xét lại hồ sơ bón phân và tưới tiêu gần đây<br>
            • Kiểm tra cây trồng để tìm dấu hiệu thiếu hoặc thừa đạm<br>
            • Liên hệ hỗ trợ kỹ thuật nếu vấn đề thiết bị vẫn tiếp diễn
            `},"Không có dữ liệu":{en:`
            • Check NTS sensors for malfunction or calibration issues<br>
            • Perform manual soil tests to assess nitrogen levels<br>
            • Review recent fertilization and irrigation records<br>
            • Inspect crops for visual signs of nitrogen deficiency or excess<br>
            • Contact technical support if equipment issues persist
            `,vi:`
            • Kiểm tra các cảm biến NTS xem có bị hỏng hoặc vấn đề hiệu chuẩn không<br>
            • Thực hiện xét nghiệm đất thủ công để đánh giá mức đạm<br>
            • Xem xét lại hồ sơ bón phân và tưới tiêu gần đây<br>
            • Kiểm tra cây trồng để tìm dấu hiệu thiếu hoặc thừa đạm<br>
            • Liên hệ hỗ trợ kỹ thuật nếu vấn đề thiết bị vẫn tiếp diễn
            `}};return recommendations[statusKey]||{en:"No specific recommendations available. Please consult with a local agronomist.",vi:"Không có khuyến nghị cụ thể. Vui lòng tham khảo ý kiến của chuyên gia nông học địa phương."};}
function getP205Recommendation(status){const statusKey=status.replace(/<[^>]*>/g,'').trim();const recommendations={"Average P2O5":{en:`
            • Maintain current fertilization practices<br>
            • Monitor NTS levels regularly<br>
            • Balance nitrogen with other nutrients<br>
            • Optimize irrigation for nutrient uptake<br>
            • Continue soil health management practices
            `,vi:`
            • Duy trì phương pháp bón phân hiện tại<br>
            • Theo dõi mức NTS thường xuyên<br>
            • Cân bằng đạm với các chất dinh dưỡng khác<br>
            • Tối ưu hóa tưới tiêu để hấp thu dinh dưỡng<br>
            • Tiếp tục các biện pháp quản lý sức khỏe đất
            `},"P2O5 Trung bình":{en:`
            • Maintain current fertilization practices<br>
            • Monitor NTS levels regularly<br>
            • Balance nitrogen with other nutrients<br>
            • Optimize irrigation for nutrient uptake<br>
            • Continue soil health management practices
            `,vi:`
            • Duy trì phương pháp bón phân hiện tại<br>
            • Theo dõi mức NTS thường xuyên<br>
            • Cân bằng đạm với các chất dinh dưỡng khác<br>
            • Tối ưu hóa tưới tiêu để hấp thu dinh dưỡng<br>
            • Tiếp tục các biện pháp quản lý sức khỏe đất
            `},"Very Low P2O5":{en:`
            • Increase nitrogen fertilization<br>
            • Consider foliar application of nitrogen<br>
            • Improve soil organic matter content<br>
            • Check for nutrient deficiencies<br>
            • Adjust irrigation to prevent nutrient leaching
            `,vi:`
            • Tăng cường bón phân đạm<br>
            • Cân nhắc bón phân đạm qua lá<br>
            • Cải thiện hàm lượng chất hữu cơ trong đất<br>
            • Kiểm tra tình trạng thiếu dinh dưỡng<br>
            • Điều chỉnh tưới tiêu để tránh rửa trôi dinh dưỡng
            `},"P2O5 Nghèo":{en:`
            • Increase nitrogen fertilization<br>
            • Consider foliar application of nitrogen<br>
            • Improve soil organic matter content<br>
            • Check for nutrient deficiencies<br>
            • Adjust irrigation to prevent nutrient leaching
            `,vi:`
            • Tăng cường bón phân đạm<br>
            • Cân nhắc bón phân đạm qua lá<br>
            • Cải thiện hàm lượng chất hữu cơ trong đất<br>
            • Kiểm tra tình trạng thiếu dinh dưỡng<br>
            • Điều chỉnh tưới tiêu để tránh rửa trôi dinh dưỡng
            `},"High P2O5":{en:`
            • Reduce nitrogen fertilization<br>
            • Increase application of other nutrients (P, K)<br>
            • Monitor for signs of nitrogen toxicity<br>
            • Improve soil drainage if necessary<br>
            • Consider planting nitrogen-fixing cover crops
            `,vi:`
            • Giảm bón phân đạm<br>
            • Tăng cường bón các chất dinh dưỡng khác (P, K)<br>
            • Theo dõi các dấu hiệu ngộ độc đạm<br>
            • Cải thiện thoát nước đất nếu cần thiết<br>
            • Cân nhắc trồng cây phủ đất cố định đạm
            `},"P2O5 Cao":{en:`
            • Reduce nitrogen fertilization<br>
            • Increase application of other nutrients (P, K)<br>
            • Monitor for signs of nitrogen toxicity<br>
            • Improve soil drainage if necessary<br>
            • Consider planting nitrogen-fixing cover crops
            `,vi:`
            • Giảm bón phân đạm<br>
            • Tăng cường bón các chất dinh dưỡng khác (P, K)<br>
            • Theo dõi các dấu hiệu ngộ độc đạm<br>
            • Cải thiện thoát nước đất nếu cần thiết<br>
            • Cân nhắc trồng cây phủ đất cố định đạm
            `},"No data":{en:`
            • No recommendations at the moment. Check NTS monitoring equipment.
            `,vi:`
            • Hiện tại không có khuyến nghị. Kiểm tra thiết bị theo dõi NTS.
            `},"Không có dữ liệu":{en:`
            • No recommendations at the moment. Check NTS monitoring equipment.
            `,vi:`
            • Hiện tại không có khuyến nghị. Kiểm tra thiết bị theo dõi NTS.
            `}};return recommendations[statusKey]||{en:"No specific recommendations available.",vi:"Không có khuyến nghị cụ thể."};}
function getk2oRecommendation(status){const statusKey=status.replace(/<[^>]*>/g,'').trim();const recommendations={"Average K2O":{en:`
            • Maintain current potassium application rates<br>
            • Monitor K2O levels quarterly<br>
            • Use balanced NPK fertilizers<br>
            • Incorporate crop residues to recycle K<br>
            • Rotate crops to optimize K utilization
            `,vi:`
            • Duy trì tỷ lệ bón kali hiện tại<br>
            • Theo dõi mức K2O hàng quý<br>
            • Sử dụng phân bón NPK cân bằng<br>
            • Bổ sung tàn dư cây trồng để tái chế K<br>
            • Luân canh cây trồng để tối ưu hóa việc sử dụng K
            `},"K2O Trung bình":{en:`
            • Maintain current potassium application rates<br>
            • Monitor K2O levels quarterly<br>
            • Use balanced NPK fertilizers<br>
            • Incorporate crop residues to recycle K<br>
            • Rotate crops to optimize K utilization
            `,vi:`
            • Duy trì tỷ lệ bón kali hiện tại<br>
            • Theo dõi mức K2O hàng quý<br>
            • Sử dụng phân bón NPK cân bằng<br>
            • Bổ sung tàn dư cây trồng để tái chế K<br>
            • Luân canh cây trồng để tối ưu hóa việc sử dụng K
            `},"Very Low K2O":{en:`
            • Increase potassium application by 40-50%<br>
            • Apply potassium sulfate or muriate of potash<br>
            • Consider foliar application of potassium<br>
            • Improve soil organic matter content<br>
            • Monitor magnesium levels to maintain K:Mg ratio
            `,vi:`
            • Tăng lượng bón kali lên 40-50%<br>
            • Bón kali sulfat hoặc kali clorua<br>
            • Cân nhắc bón kali qua lá<br>
            • Cải thiện hàm lượng chất hữu cơ trong đất<br>
            • Theo dõi mức magiê để duy trì tỷ lệ K:Mg
            `},"K2O Nghèo":{en:`
            • Increase potassium application by 40-50%<br>
            • Apply potassium sulfate or muriate of potash<br>
            • Consider foliar application of potassium<br>
            • Improve soil organic matter content<br>
            • Monitor magnesium levels to maintain K:Mg ratio
            `,vi:`
            • Tăng lượng bón kali lên 40-50%<br>
            • Bón kali sulfat hoặc kali clorua<br>
            • Cân nhắc bón kali qua lá<br>
            • Cải thiện hàm lượng chất hữu cơ trong đất<br>
            • Theo dõi mức magiê để duy trì tỷ lệ K:Mg
            `},"High K2O":{en:`
            • Reduce potassium application by 25-30%<br>
            • Increase calcium and magnesium applications<br>
            • Monitor for potential magnesium deficiency<br>
            • Avoid using chloride-containing K fertilizers<br>
            • Plant high K-demanding crops in rotation
            `,vi:`
            • Giảm lượng bón kali xuống 25-30%<br>
            • Tăng cường bón canxi và magiê<br>
            • Theo dõi tình trạng thiếu magiê tiềm ẩn<br>
            • Tránh sử dụng phân K chứa clorua<br>
            • Trồng luân canh các cây trồng có nhu cầu K cao
            `},"K2O Cao":{en:`
            • Reduce potassium application by 25-30%<br>
            • Increase calcium and magnesium applications<br>
            • Monitor for potential magnesium deficiency<br>
            • Avoid using chloride-containing K fertilizers<br>
            • Plant high K-demanding crops in rotation
            `,vi:`
            • Giảm lượng bón kali xuống 25-30%<br>
            • Tăng cường bón canxi và magiê<br>
            • Theo dõi tình trạng thiếu magiê tiềm ẩn<br>
            • Tránh sử dụng phân K chứa clorua<br>
            • Trồng luân canh các cây trồng có nhu cầu K cao
            `},"No data":{en:`
            • Check K2O monitoring equipment<br>
            • Perform soil tests to assess potassium levels<br>
            • Review recent fertilization records<br>
            • Inspect crops for visual signs of K deficiency or excess<br>
            • Consult with a soil specialist for advice
            `,vi:`
            • Kiểm tra thiết bị theo dõi K2O<br>
            • Thực hiện xét nghiệm đất để đánh giá mức kali<br>
            • Xem xét lại hồ sơ bón phân gần đây<br>
            • Kiểm tra cây trồng để tìm dấu hiệu thiếu hoặc thừa K<br>
            • Tham khảo ý kiến chuyên gia đất đai
            `},"Không có dữ liệu":{en:`
            • Check K2O monitoring equipment<br>
            • Perform soil tests to assess potassium levels<br>
            • Review recent fertilization records<br>
            • Inspect crops for visual signs of K deficiency or excess<br>
            • Consult with a soil specialist for advice
            `,vi:`
            • Kiểm tra thiết bị theo dõi K2O<br>
            • Thực hiện xét nghiệm đất để đánh giá mức kali<br>
            • Xem xét lại hồ sơ bón phân gần đây<br>
            • Kiểm tra cây trồng để tìm dấu hiệu thiếu hoặc thừa K<br>
            • Tham khảo ý kiến chuyên gia đất đai
            `}};return recommendations[statusKey]||{en:"No specific recommendations available. Please consult with a local agronomist.",vi:"Không có khuyến nghị cụ thể. Vui lòng tham khảo ý kiến của chuyên gia nông học địa phương."};}