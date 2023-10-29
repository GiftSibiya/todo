import 'package:flutter/material.dart';
import 'package:tododo/constants/colors.dart';
import 'package:tododo/constants/assets_strings.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: tbBGColor,
      appBar: _buildAppBar(),
      body: Container(
        padding: EdgeInsets.symmetric(horizontal: 15),
        child: Column(
          children: [
            Container(
              decoration: BoxDecoration(
                  color: Colors.white, borderRadius: BorderRadius.circular(20)),
              child: TextField(
                decoration: InputDecoration(
                    contentPadding: EdgeInsets.all(0),
                    prefixIcon: Icon(
                      Icons.search,
                      color: tbBlack,
                      size: 20,
                    )),
              ),
            )
          ],
        ),
      ),
    );
  }

  AppBar _buildAppBar() {
    return AppBar(
      backgroundColor: tbBGColor,
      elevation: 0,
      title: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Icon(
            Icons.menu,
            color: tbBlack,
            size: 30,
          ),
          Container(
            height: 40,
            width: 40,
            child: ClipRRect(
              borderRadius: BorderRadius.circular(20),
              child: Image.asset(cuteb0b0),
            ),
          )
        ],
      ),
    );
  }
}
